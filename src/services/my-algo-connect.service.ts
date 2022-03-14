import MyAlgoConnect from "@randlabs/myalgo-connect"


export const MyAlgoConnectService: {service: MyAlgoConnect} = {
  service: new MyAlgoConnect()
}

export function setMyAlgoConnect(service: MyAlgoConnect) {
  MyAlgoConnectService.service = service
}
