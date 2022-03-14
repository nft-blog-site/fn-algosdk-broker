import { AssetFormatter } from "./asset-formatter.interface"


export const AssetFormatterService = {
  getAssetFormatter: (asaType: string) => {
    return AssetFormatterService.formatters
      .find(formatter => formatter.asaType === asaType) ?. formatter
  },
  formatters: []
}

export function registerFormatter(asaType: string, 
    formatter: AssetFormatter) {
      console.log('registered')
  AssetFormatterService.formatters.push({
    asaType,
    formatter
  })
}
