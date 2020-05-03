import { Vue, Component } from "vue-property-decorator";
import * as monaco from "monaco-editor";
// import Axios from "axios";
// import { webSetting } from "@/settings";
import "./_index.scss";

@Component({
    template: require("./index.html"),
    components: {
        // Comp
    }
})
export default class Edit extends Vue {

    public htmlEditor!: monaco.editor.IStandaloneCodeEditor;
    public scssEditor!: monaco.editor.IStandaloneCodeEditor;
    public tsEditor!: monaco.editor.IStandaloneCodeEditor;
    public jsEditor!: monaco.editor.IStandaloneCodeEditor;

    public iframe!: HTMLIFrameElement;

    public mounted() {
        this.htmlEditor = monaco.editor.create((<any>this.$refs).htmlEditor, {
            value: "<div class='ceshi'>ceshi</div>",
            language: "html"
        });
        this.scssEditor = monaco.editor.create((<any>this.$refs).scssEditor, {
            value: ".ceshi {color: red;}",
            language: "scss"
        });
        this.tsEditor = monaco.editor.create((<any>this.$refs).tsEditor, {
            value: "console.log('Hello world!');",
            language: "typescript"
        });
        // this.jsinstanse = monaco.editor.create((<any>this.$refs).jsEditor, {
        //     value: "console.log('Hello world!');",
        //     language: "javascript"
        // });
    }

    public transform() {
        // console.log(this.scssEditor.getValue());
        console.log(monaco.languages.css.scssDefaults);
        // monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        //     ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
        //     target: monaco.languages.typescript.ScriptTarget.ES5
        // });
        // monaco.languages.typescript.getTypeScriptWorker().then(worker => {
        //     worker(this.tsEditor.getModel()?.uri as any)
        //         .then(client => client.getEmitOutput(this.tsEditor.getModel()?.uri.toString() as string))
        //         .then(res => {
        //             this.createIframe({
        //                 html: this.htmlEditor.getValue(),
        //                 js: res.outputFiles[0].text
        //             });
        //             // this.jsinstanse.setValue(res.outputFiles[0].text);
        //         });
        // });
    }

    public createIframe(options: { html?: string; css?: string; js?: string }) {
        this.iframe?.remove();
        this.iframe = document.createElement("iframe");
        (<any>this.$refs).view.appendChild(this.iframe);
        let iframedocument = this.iframe.contentDocument as Document;
        let iframeWindow = this.iframe.contentWindow;

        let script = iframedocument.createElement("script");
        script.innerHTML = options.js || "";
        let style = iframedocument.createElement("style");
        style.innerHTML = options.css || "";

        iframedocument.body.innerHTML += options.html || "";
        iframedocument.body.appendChild(style);
        iframedocument.body.appendChild(script);
    }
}
