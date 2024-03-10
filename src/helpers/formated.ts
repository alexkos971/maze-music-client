const formatTime = (totalSeconds: number) => {
    const seconds: number = Math.ceil(totalSeconds)
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const secondsFormatted = secondsRemaining < 10 ? `0${Math.round(secondsRemaining)}` : `${Math.round(secondsRemaining)}`;

    return `${minutes}:${secondsFormatted}`;
};

const formatNumber = (num: number) : string => {
    const suffixes = ["", "K", "M", "B", "T"];

    const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
    const roundedNum = ( num / Math.pow(10, magnitude * 3) ).toFixed(1);

    return `${roundedNum}${suffixes[magnitude]}`;
} 

export {
    formatTime, formatNumber
};