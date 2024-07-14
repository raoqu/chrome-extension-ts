import $ from 'jquery';
import MessageUtil, { MESSAGE_PERFORM } from './lib/message_util';

function copyToClipboard(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)

  textarea.focus()
  textarea.select()

  try {
    const successful = document.execCommand('copy')
    // successful && console.log('SUCCESS copy to clipboard')
  }
  catch (err) {
    console.log('FAILED copy to clipboard')
  }

  document.body.removeChild(textarea)
}

function parseTranslations() {
  let texts = $('.caption-translation').map(function () {
    return $(this).text().trim()
  }).get()
  let text = texts.join('')
  text = text.replace(/\n/g, '').replace(/\r/g, '').replace(/\n/g, '').replace(/。/g, '。\n').replace(/\u00A0/g, '').replace(/^\s+/g, '')
  copyToClipboard(text)
  return text
}

function performCommand() {
  return parseTranslations()
}

MessageUtil.on(MESSAGE_PERFORM, (data: any) => {
  const obj = performCommand()
  console.log(obj)
  return obj
})