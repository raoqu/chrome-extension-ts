import MessageUtil from "./lib/message_util";

const __updateBadge = (text: string) => {
  chrome.action.setBadgeText({ text: text })
}

MessageUtil.on('update-badge', __updateBadge, false)
