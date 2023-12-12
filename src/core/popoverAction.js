export default {
  show: ($icon, content) => {
    $icon.css('cursor', 'pointer').popover('destroy').popover({
      container: 'body',
      content,
      html: true,
      placement: 'auto top',
      trigger: 'hover click',
    })
  },
  hide: ($icon) => {
    $icon.css('cursor', '').popover('destroy')
  },
}
