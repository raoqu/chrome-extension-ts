export interface IExtensionOptions {
    showDock?: boolean
}

export default class OptionsUtil {

    public static DEFAULT_OPTIONS: IExtensionOptions = {
        showDock: true
    }

    static Get(callback: (options: IExtensionOptions) => void) {

        chrome.storage.sync.get(
            OptionsUtil.DEFAULT_OPTIONS,
            (items) => {
                const retrievedOptions: Partial<IExtensionOptions> = items;
                const options: IExtensionOptions = {
                    ...OptionsUtil.DEFAULT_OPTIONS,
                    ...retrievedOptions,
                };
                callback(options)
            }
        );
    }

    static Save(options: IExtensionOptions, callback: () => void) {
        chrome.storage.sync.set(options, callback)
    }
}

