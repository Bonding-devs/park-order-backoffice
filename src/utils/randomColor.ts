const tailwindColors = [
    'bg-blue-300',
    'bg-green-300',
    'bg-yellow-300',
    'bg-purple-300',
    'bg-pink-300',
    'bg-indigo-300',
    'bg-teal-300',
    'bg-orange-300',
];

export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    return tailwindColors[randomIndex];
};

export const getColorByIndex = (index: number) => {
    return tailwindColors[index % tailwindColors.length];
}