export default {
  show: ($icon, title) => {
    $icon.css('cursor', 'pointer').tooltip('destroy').tooltip({
      container: 'body',
      html: true,
      placement: 'auto top',
      title,
    })
  },
  hide: ($icon) => {
    $icon.css('cursor', '').tooltip('destroy')
  },
}
