let zvuk = 0
let začátek = 0
let delka = 0
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    zvuk = Math.trunc(randint(3, 30))
    zvuk *= 100
    basic.showIcon(IconNames.Yes)
    on_button_pressed_a()
})
function on_button_pressed_a() {
    
    if (zvuk != 0) {
        basic.showLeds(`
        . . # . .
        . # . # .
        # . . . #
        . # . # .
        . . # . .
        `)
        music.playTone(Note.D, zvuk)
    }
    
}

input.onButtonPressed(Button.A, on_button_pressed_a)
input.onLogoEvent(TouchButtonEvent.Touched, function logo_pressed() {
    if (zvuk != 0) {
        
        začátek = control.millis()
        console.log(začátek)
    }
    
})
input.onLogoEvent(TouchButtonEvent.Released, function logo_released() {
    let rozdíl: number;
    
    if (začátek != 0) {
        delka = control.millis() - začátek
        console.log(delka)
        rozdíl = zvuk - delka
        console.log(rozdíl)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        for (let i = 0; i < Math.abs(Math.idiv(rozdíl, 100)); i++) {
            led.unplot(Math.idiv(i, 5), i - Math.idiv(i, 5) * 5)
        }
        basic.pause(2500)
        if (rozdíl > 0) {
            basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        } else if (rozdíl < 0) {
            basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        }
        
    }
    
})
