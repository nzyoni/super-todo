import confetti from 'canvas-confetti'

export const triggerTaskCreatedConfetti = () => {
  // Create a colorful burst of confetti
  const count = 200
  const defaults = {
    origin: { y: 0.7 },
    gravity: 0.8,
    drift: 0,
    ticks: 200,
    decay: 0.94,
    scalar: 1,
  }

  function fire(particleRatio: number, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    })
  }

  // Fire multiple bursts with different colors and angles
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#f472b6', '#ec4899', '#be185d'],
  })

  fire(0.2, {
    spread: 60,
    startVelocity: 45,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#f472b6', '#ec4899', '#be185d'],
  })

  fire(0.35, {
    spread: 100,
    startVelocity: 35,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#f472b6', '#ec4899', '#be185d'],
  })

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#f472b6', '#ec4899', '#be185d'],
  })

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#f472b6', '#ec4899', '#be185d'],
  })
}
