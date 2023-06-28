import Axios from "api/authApi";

function CustomUploadAdapterPlugin(editor) {
    const informe_id = editor.config._config.patolsima_informe_id;
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        console.log("calling createUploadAdapter");
        return new ImageUploadAdapter(loader, informe_id)
    }
}

class ImageUploadAdapter {
    constructor(loader, informe_id) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;
        this.informe_id = informe_id;
        // URL where to send files.
        this.requestPromise = null;
        this.abortController = new AbortController();
        console.log('ImageUploadAdapter creado');
    }

    // Starts the upload process.
    upload() {
        console.log('desde la carga informe_id');
        console.log(this.informe_id);
        const data = new FormData();
        const token = localStorage.getItem("access");
        return new Promise((resolve, reject) => {
            var config = {
                onUploadProgress: function (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        this.loader.uploadTotal = progressEvent.total;
                        this.loader.uploaded = progressEvent.loaded;
                    }
                },
                signal: this.abortController.signal
            };

            this.loader.file.then(result => {
                data.append('file', result);
                Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
                this.requestPromise = Axios.post(`/v1/core/informes/`, data, config);
                this.requestPromise.then(data => {
                    console.log('from Api');
                    console.log(data);
                    resolve(data);
                })
                .catch(err => {
                    console.log('Error from Api');
                    console.log(err);
                    reject(err);
                });
            });
        });
    }

    // Aborts the upload process.
    abort() {
        if (this.abortController) {
            this.abortController.abort();
        }
    }

}

export default CustomUploadAdapterPlugin;