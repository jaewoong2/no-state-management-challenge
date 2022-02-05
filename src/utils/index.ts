export const getColor = ({ r, g, b, a, weight }: { r: number, g: number, b: number, a: number, weight: number }) => {
    return `rgba(${r + weight}, ${g + weight}, ${b + weight}, ${a})`
}

export const getRandomColor = (num: number) => num > 1 ? Math.floor(Math.random() * num) : Math.random() * num