'use strict'

const cvs = document.getElementById('hero-canvas')

function calculateDrillo() {
    const ctx = cvs.getContext('2d')
    const man = {
        x: 0,
        y: 1,
        vx: 0,
        vy: -.2,
        dir: 0,
        dirSwitch: 300,
        dirCount: 0,
        oldDirection: 1,
        blink: 0,
        blinkTime: 60,
        blinkSustain: 30,
        sneezeY: 0,
        lookX: 0,
        lookY: 0,
        lookTime: 0,
        lookXSth: 0,
        lookYSth: 0,
        onGround: 0,
        splat: 0,
        blinkType: 'sneeze',
        sneezeReoccur: 340
    }
    let box = 0
    let appear = -10
    let time = 0

    const resize = () => {
        cvs.width = cvs.clientWidth * devicePixelRatio
        cvs.height = cvs.clientHeight * devicePixelRatio
        box = 30 + (cvs.width + cvs.height * 2) / 80
    }

    addEventListener('resize', resize)
    resize()

    const animate = perf => {
        const dt = Math.min((performance.now() - perf) / 16, 2)
        const MAX_REPEATS = 2
        let landSuspension = 0

        time += dt

        appear += .1 * dt
        if (appear > 1) appear = 1
        if (appear > 0) {
            man.vy += .04 * dt
            man.y -= man.vy * dt
            if (man.y < 0) {
                man.vy = 0
                man.y = 0

                man.onGround += dt
                if (man.onGround < 12) landSuspension = 1
                else landSuspension = 0
            }
        }

        man.dirSwitch -= dt
        if (man.dirSwitch < 0) {
            const speed = .8 + Math.random() * .3

            if (man.blinkTime < 30)
                man.blinkTime = 30

            // Store current direction
            if (man.dir) man.oldDirection = man.dir

            if (!man.dir) man.dir = (Math.random() < .5 ? -speed : speed)
            else if (man.dir > 0) man.dir = 0
            else if (man.dir < 0) man.dir = 0

            if (!man.dir) man.dirSwitch = 200 + Math.random() * 40
            else man.dirSwitch = 170 + Math.random() * 70

            // Compare directions
            if (Math.sign(man.oldDirection) == Math.sign(man.dir))
                man.dirCount ++

            // Reverse direction if been traveling that way for too long
            if (man.dirCount >= MAX_REPEATS) {
                man.dir = -man.oldDirection
                man.dirCount = 0
            }
        }

        let sneezeY = 0
        let blinking = false
        let sneezing = false

        if ((!man.dir && appear > 0) || man.blinkTime < 0) {
            man.blinkTime -= dt
            man.sneezeReoccur -= dt

            const SNEEZE_HOLD = 21

            // Blinking
            if (man.blinkTime < -man.blinkSustain) {
                man.blinkTime = 60 + Math.random() * 100
                man.blinkSustain = SNEEZE_HOLD
                man.blinkType = 'sneeze'

                // Blink if sneezed to recently
                if (man.sneezeReoccur > 0) man.blinkType = 'blink'

                // Otherwise sneeze and reset the timer
                else man.sneezeReoccur = 300
            }

            if (man.blinkType == 'sneeze') {
                if (man.blinkTime < 10) sneezeY = -.2
                if (man.blinkTime < 0) {
                    sneezeY = .2
                    blinking = true
                    sneezing = true
                }
                if (man.blinkTime < -SNEEZE_HOLD + 5) {
                    sneezeY = -.1
                    blinking = false
                    sneezing = false
                }
                if (man.blinkTime < -SNEEZE_HOLD) sneezeY = 0
            }

            else {
                if (man.blinkTime < 0) {
                    sneezeY = .05
                    blinking = true
                }
                if (man.blinkTime < -15) {
                    sneezeY = 0
                    blinking = false
                }
            }
        }

        // Looking
        if (man.blinkTime > 20 || man.dir) {
            man.lookTime -= dt

            if (man.lookTime < 0) {
                man.lookX = (Math.random() - .5) * .2
                man.lookY = (Math.random() - .5) * .13
                man.lookTime = 10 + Math.random() * 30
            }
        }

        man.vx += man.dir * .02 * dt
        man.vx *= Math.pow(.93, dt)
        man.x += man.vx * dt
        man.lookXSth += (man.lookX - man.lookXSth) / 2 * dt
        man.lookYSth += (man.lookY - man.lookYSth) / 2 * dt
        man.sneezeY += (sneezeY - man.sneezeY) / 2 * dt
        man.splat += (landSuspension - man.splat) / 2 * dt

        ctx.clearRect(0, 0, cvs.width, cvs.height)

        const WIDTH = box
        const OVERALL_HEIGHT = 1.3

        const HEAD_HEIGHT = .6
        const HEAD_Y = man.sneezeY / 2 + man.splat * .6
        const HEAD_BOB_AMT = .1

        const EYE = .18
        const EYE_X = .16
        const EYE_Y = .3 + man.sneezeY / 4 + man.splat * .1

        const EYE_LOOK_X = Math.max(-.13, Math.min(man.lookXSth + man.vx / 2, .13))
        const EYE_LOOK_Y = man.lookYSth

        const BLINK = (blinking ? .28 : 1)

        const FOOT = .2
        const FOOT_X = .3 + man.splat * .15
        const FOOT_Y = .3

        const FOOT_1_X = Math.sin(man.x - Math.PI / 2)
        const FOOT_2_X = Math.sin(man.x + Math.PI / 2)

        const FOOT_1_Y = Math.max(0, Math.cos(man.x - Math.PI / 2))
        const FOOT_2_Y = Math.max(0, Math.cos(man.x + Math.PI / 2))

        const HEAD_BOB = Math.cos(man.x * 2)

        const SPEED = .23
        // Apply movement distortion
        const X = man.x + Math.sin(man.x * 2 + Math.PI) * .1
        const POS = cvs.width / 2 + X * SPEED * box
        const POSY = cvs.height - man.y * box

        if (POS < -WIDTH / 2) {
            man.dir = -.9
            man.x = ((cvs.width / 2) / (SPEED * box)) + WIDTH * 2 / box
        }

        if (POS > cvs.width + WIDTH / 2) {
            man.dir = .9
            man.x = (-(cvs.width / 2) / (SPEED * box)) - WIDTH * 2 / box
        }

        const WHITE = 'rgb(255,255,255,'+appear+')'
        const BLACK = 'rgb(0,0,0,'+appear+')'
        let white = lightThemeEnabled ? BLACK : WHITE
        let black = lightThemeEnabled ? WHITE : BLACK

        // HEAD
        ctx.fillStyle = white
        ctx.fillRect(POS - WIDTH / 2, POSY - OVERALL_HEIGHT * box + HEAD_BOB * HEAD_BOB_AMT * box + HEAD_Y * box, WIDTH, HEAD_HEIGHT * box)

        // EYES
        if (sneezing) {
            const X_STRETCH = .14 * box
            const Y_STRETCH = .08 * box
            const SPLIT = .05 * box
            ctx.strokeStyle = black
            ctx.lineWidth = box * .07
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.beginPath()
            ctx.moveTo(POS - SPLIT + EYE_LOOK_X * box - EYE_X * box, POSY - OVERALL_HEIGHT * box + EYE_Y * box - Y_STRETCH + EYE_LOOK_Y * box + HEAD_BOB * HEAD_BOB_AMT * box + HEAD_Y * box)
            ctx.lineTo(POS - SPLIT + X_STRETCH + EYE_LOOK_X * box - EYE_X * box, POSY - OVERALL_HEIGHT * box + EYE_Y * box + EYE_LOOK_Y * box + HEAD_BOB * HEAD_BOB_AMT * box + HEAD_Y * box)
            ctx.lineTo(POS - SPLIT + EYE_LOOK_X * box - EYE_X * box, POSY - OVERALL_HEIGHT * box + EYE_Y * box + Y_STRETCH + EYE_LOOK_Y * box + HEAD_BOB * HEAD_BOB_AMT * box + HEAD_Y * box)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(POS + SPLIT + EYE_LOOK_X * box + EYE_X * box, POSY - OVERALL_HEIGHT * box + EYE_Y * box - Y_STRETCH + EYE_LOOK_Y * box + HEAD_BOB * HEAD_BOB_AMT * box + HEAD_Y * box)
            ctx.lineTo(POS + SPLIT - X_STRETCH + EYE_LOOK_X * box + EYE_X * box, POSY - OVERALL_HEIGHT * box + EYE_Y * box + EYE_LOOK_Y * box + HEAD_BOB * HEAD_BOB_AMT * box + HEAD_Y * box)
            ctx.lineTo(POS + SPLIT + EYE_LOOK_X * box + EYE_X * box, POSY - OVERALL_HEIGHT * box + EYE_Y * box + Y_STRETCH + EYE_LOOK_Y * box + HEAD_BOB * HEAD_BOB_AMT * box + HEAD_Y * box)
            ctx.stroke()
        }

        else {
            ctx.fillStyle = black
            ctx.fillRect(POS - EYE * box / 2 + EYE_LOOK_X * box - EYE_X * box, POSY - OVERALL_HEIGHT * box + EYE_Y * box - EYE * BLINK * box / 2 + EYE_LOOK_Y * box + HEAD_BOB * HEAD_BOB_AMT * box + HEAD_Y * box, EYE * box, EYE * BLINK * box)
            ctx.fillRect(POS - EYE * box / 2 + EYE_LOOK_X * box + EYE_X * box, POSY - OVERALL_HEIGHT * box + EYE_Y * box - EYE * BLINK * box / 2 + EYE_LOOK_Y * box + HEAD_BOB * HEAD_BOB_AMT * box + HEAD_Y * box, EYE * box, EYE * BLINK * box)
        }

        // FEET
        ctx.fillStyle = white
        ctx.fillRect(POS - FOOT * box / 2 + FOOT_1_X * FOOT_X * box, POSY - FOOT * box - FOOT_1_Y * FOOT_Y * box, FOOT * box, FOOT * box)
        ctx.fillRect(POS - FOOT * box / 2 + FOOT_2_X * FOOT_X * box, POSY - FOOT * box - FOOT_2_Y * FOOT_Y * box, FOOT * box, FOOT * box)

        const old = performance.now()
        requestAnimationFrame(() => animate(old))
    }

    animate(0)
}
calculateDrillo()