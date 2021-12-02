zvuk = 0
začátek = 0
delka = 0

def on_button_pressed_b():
    global zvuk
    zvuk = int(randint(1, 12))
    zvuk *= 250
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
        if rozdíl < 150 and rozdíl > -150 :
                    music.play_tone(Note.C, 500)
                    basic.pause(250)
                    music.play_tone(Note.C, 500)
                    basic.show_leds("""
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    """)
        elif rozdíl > 0:
            basic.show_leds("""
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            """)
        elif rozdíl < 0:
            led.plot_bar_graph(zvuk, delka)
            basic.pause(2500)
            basic.show_leds("""
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            """)
        elif rozdíl < 250000 or -250000 :
            music.play_melody("c", 500)
input.on_logo_event(TouchButtonEvent.RELEASED, logo_released)




