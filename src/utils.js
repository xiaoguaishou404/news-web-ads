let nowcount = 0

export default {
  getDIvIDCount() {
    let strIs = `div-gpt-ad-1718189946108-${nowcount++}`
    googletag.cmd.push(() => {
      googletag
        .defineSlot(
          '/6355419/Travel/Asia',
          ['fluid', [336, 280], [250, 250], [300, 250]],
          strIs,
        )
        .addService(googletag.pubads())
      googletag.enableServices()
    })
    return strIs
  },
}
