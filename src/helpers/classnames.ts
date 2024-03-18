export const classnames = (...args: any[]) : string => {
    return args.filter(el => typeof el == 'string' && el.length !== 0 ).join(' ');
}