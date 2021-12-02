let zvuk = 0
let začátek = 0
let delka = 0
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    zvuk = Math.trunc(randint(1, 12))
    zvuk *= 250
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
        if (rozdíl < 150 && rozdíl > -150) {
            music.playTone(Note.C, 500)
            basic.pause(250)
            music.playTone(Note.C, 500)
            basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    `)
        } else if (rozdíl > 0) {
            basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        } else if (rozdíl < 0) {
            led.plotBarGraph(zvuk, delka)
            basic.pause(2500)
            basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        } else if (rozdíl < 250000 || -250000) {
            music.playMelody("c", 500)
        }
        
    }
    
})
