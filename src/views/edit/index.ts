import { Vue, Component } from "vue-property-decorator";
import * as monaco from "monaco-editor";
import Service from "./service";
import { autowired } from "@/common/decorators/autowired";
// import { webSetting } from "@/settings";
import "./_index.scss";

@Component({
    template: require("./index.html"),
    components: {
        // Comp
    }
})
export default class Edit extends Vue {

    @autowired(Service)
    public service!: Service;

    public htmlEditor!: monaco.editor.IStandaloneCodeEditor;
    public scssEditor!: monaco.editor.IStandaloneCodeEditor;
    public tsEditor!: monaco.editor.IStandaloneCodeEditor;
    public jsEditor!: monaco.editor.IStandaloneCodeEditor;

    public iframe!: HTMLIFrameElement;

    public mounted() {
        this.htmlEditor = monaco.editor.create((<any>this.$refs).htmlEditor, {
            value: "<div id='app'>ceshi</div>",
            language: "html"
        });
        this.scssEditor = monaco.editor.create((<any>this.$refs).scssEditor, {
            value: "body{color:'#000';#app {color: red;}}",
            language: "scss"
        });
        this.tsEditor = monaco.editor.create((<any>this.$refs).tsEditor, {
            value: "// @ts-ignore\nimport Vue from 'https://cdn.skypack.dev/vue';\nconsole.log('Hello world!', Vue);",
            language: "typescript"
        });
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
            // target: monaco.languages.typescript.ScriptTarget.ES5
            target: monaco.languages.typescript.ScriptTarget.ESNext,
            module: monaco.languages.typescript.ModuleKind.ESNext,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs
        });

        // this.jsEditor = monaco.editor.create((<any>this.$refs).tsEditor, {
        //     value: "import Vue from 'https://cdn.skypack.dev/vue';\nconsole.log('Hello world!', Vue);",
        //     language: "javascript"
        // });
    }

    public async transform() {
        const css = await this.service.getCss(this.scssEditor.getValue());
        // console.log(monaco.languages.css.scssDefaults);
        monaco.languages.typescript.getTypeScriptWorker().then(worker => {
            worker(this.tsEditor.getModel()?.uri as any)
                .then(client => client.getEmitOutput(this.tsEditor.getModel()?.uri.toString() as string))
                .then(res => {
                    this.createIframe({
                        html: this.htmlEditor.getValue(),
                        css: css,
                        js: res.outputFiles[0].text
                        // js: this.jsEditor.getValue()
                    });
                    // this.jsinstanse.setValue(res.outputFiles[0].text);
                });
        });
    }

    public createIframe(options: { html?: string; css?: string; js?: string }) {
        this.iframe?.remove();
        this.iframe = document.createElement("iframe");
        (<any>this.$refs).view.appendChild(this.iframe);
        let iframedocument = this.iframe.contentDocument as Document;
        let iframeWindow = this.iframe.contentWindow;

        let script = iframedocument.createElement("script");
        script.type = "module";
        script.innerHTML = options.js || "";
        let style = iframedocument.createElement("style");
        style.innerHTML = options.css || "";

        iframedocument.body.innerHTML += options.html || "";
        iframedocument.body.appendChild(style);
        iframedocument.body.appendChild(script);
    }
}
