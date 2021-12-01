zvuk = 0
začátek = 0
delka = 0

def on_button_pressed_b():
    global zvuk
    zvuk = int(randint(3, 30))
    zvuk *= 100
    basic.show_icon(IconNames.YES)
    on_button_pressed_a()
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_a():
    global zvuk
    if zvuk != 0:
        basic.show_leds("""
        . . # . .
        . # . # .
        # . . . #
        . # . # .
        . . # . .
        """)
        music.play_tone(Note.D, zvuk)
input.on_button_pressed(Button.A, on_button_pressed_a)

def logo_pressed():
    if zvuk != 0:
        global začátek
        začátek = control.millis()
        print(začátek)
input.on_logo_event(TouchButtonEvent.TOUCHED, logo_pressed)

def logo_released():
    global začátek, delka, zvuk
    if začátek != 0:
        delka = control.millis() - začátek
        print(delka)
        rozdíl = zvuk - delka
        print(rozdíl)
        basic.show_leds("""
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            """)
        for i in range((abs(rozdíl//100))):
            led.unplot(i//5, i-(i//5)*5)
        basic.pause(2500)
        if rozdíl > 0:
            basic.show_leds("""
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            """)
        elif rozdíl < 0:
            basic.show_leds("""
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            """)        
input.on_logo_event(TouchButtonEvent.RELEASED, logo_released)




