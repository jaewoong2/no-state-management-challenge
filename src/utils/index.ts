export const getColor = ({ r, g, b, a, weight }: { r: number, g: number, b: number, a: number, weight: number }) => {
    return `rgba(${r + weight}, ${g + weight}, ${b + weight}, ${a})`
}

export const getRandomColor = (num: number) => num > 1 ? Math.floor(Math.random() * num) : Math.random() * num

export const getRgba = () => ({
    r: getRandomColor(255),
    g: getRandomColor(255),
    b: getRandomColor(255),
    a: getRandomColor(0.7) + 0.3
})

export const getNumbers = (stage: number) => {
    const col = Math.round((stage + 0.5) / 2) + 1;
    const area = Math.pow(col, 2);
    const answer = Math.floor(Math.random() * area);

    return {
        col,
        area,
        answer,
    };
}
