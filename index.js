var HID = require('node-hid');
// console.log(HID.devices());

// D-input (B+start)
vendorId = 11720
productId = 24832

const button = {
    X: 'x',
    Y: 'y',
    A: 'a',
    B: 'b',
    R: 'r',
    R2: 'r2',
    L: 'l',
    L2: 'l2'
}
const hid = new HID.HID(vendorId, productId)


hid.on('data', (data) => {
    const buttonPressed = parseButton(data)
    
    switch(buttonPressed){
        case button.R:
        case button.R2:
            console.log("Turning right")
            break
        case button.L:
        case button.L2:
            console.log("Turning left");
            break
        case button.B:
            console.log("Going Faster!")
            break
        case button.X:
        case button.A:
            console.log("Stopping!")
            break
        case button.Y:
            console.log("Slowing down!")
    }
})
const parseButton = (data) => {
    if (data[8] == 128) return button.R
    if (data[9] == 2)   return button.R2
    if (data[8] == 64)  return button.L
    if (data[9] == 1)   return button.L2
    if (data[8] == 2)   return button.B
    if (data[8] == 1)   return button.A
    if (data[8] == 16)  return button.Y
    if (data[8] == 8)   return button.X
}
