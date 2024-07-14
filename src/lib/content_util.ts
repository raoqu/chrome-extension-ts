import MessageUtil from "./message_util";

export default class ContentUtil {

    public static onload(f: () => void, resource_dependencies = false) {
        if (resource_dependencies) {
            window.addEventListener('load', function () {
                f();
            })
        }
        else {
            document.addEventListener('DOMContentLoaded', function () {
                f();
            })
        }
    }

    public static updateBadge(text: string) {
        MessageUtil.send('update-badge', text)
    }

}