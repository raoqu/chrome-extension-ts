export const MESSAGE_PERFORM = '_command_perform'

export default class MessageUtil {
    private static _MESSAGE_REGISTRY: any = {}
    private static _MESSAGE_INITIALIZED = false;

    public static on(type: string, callback: (data: any, sendResponse: any) => any, async = false) {
        if (!MessageUtil._MESSAGE_INITIALIZED) {
            MessageUtil._MESSAGE_INITIALIZED = true
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                MessageUtil._processMessage(request, sender, sendResponse)
            })
        }

        MessageUtil._MESSAGE_REGISTRY[type] = {
            callback: callback,
            async: async
        }
    }

    public static send(type: string, data: any, callback: ((response: any) => void) | undefined = undefined) {
        const message = {
            type: type,
            data: data
        }
        chrome.runtime.sendMessage(message, response => {
            callback && callback(response);
        });
    }

    public static sendTab(type: string, data: any, callback: ((response: any) => void) | undefined = undefined) {
        const message = {
            type: type,
            data: data
        }
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            tabs && tabs.length && tabs.forEach((tab) => {
                tab && tab.id && chrome.tabs.sendMessage(tab.id, message, response => {
                    callback && callback(response)
                });
            })
        })
    }

    public static _processMessage(request: any, sender: any, sendResponse: any) {
        const registry = MessageUtil._MESSAGE_REGISTRY[request.type]
        if (registry && registry.callback) {
            let result = registry.callback(request.data, sendResponse)
            if (registry.async) {
                return true
            }
            else {
                sendResponse(result)
            }
        }
    }
}