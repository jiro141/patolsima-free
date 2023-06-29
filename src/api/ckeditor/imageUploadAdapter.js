import Axios from "api/authApi";

function CustomUploadAdapterPlugin(editor) {
    const informe_id = editor.config._config.patolsima_informe_id;

    // Only allocates the upload handler for instances of the Editor with informe_id
    if (!informe_id) {
        return;
    }

    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new ImageUploadAdapter(loader, informe_id)
    }
}

class ImageUploadAdapter {
    constructor(loader, informe_id) {
        this.loader = loader;
        this.informe_id = informe_id;
        this.requestPromise = null;
        this.abortController = new AbortController();
    }

    // Starts the upload process.
    upload() {
        const data = new FormData();
        // Aqui falta refrescar el token de acceso si ya expiró
        const token = localStorage.getItem("access");
        const informe_id = this.informe_id;
        return this.loader.file.then(file_from_promise => new Promise((resolve, reject) => {
            var config = {
                onUploadProgress: function (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        this.loader.uploadTotal = progressEvent.total;
                        this.loader.uploaded = progressEvent.loaded;
                    }
                },
                signal: this.abortController.signal
            };


            data.append('file', file_from_promise);
            Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
            Axios.defaults.headers['Content-Type'] = 'multipart/form-data';
            this.requestPromise = Axios.post(`/v1/core/informes/${informe_id}/fields_image_upload/`, data, config);
            this.requestPromise.then(data => {
                    resolve({
                        urls: {
                            default: data.data.uri
                        },
                        server_response: data.data
                    });
                })
                .catch(err => {
                    reject(err);
                });
        }));
    }

    // Aborts the upload process.
    abort() {
        if (this.abortController) {
            this.abortController.abort();
        }
    }

}

export default CustomUploadAdapterPlugin;