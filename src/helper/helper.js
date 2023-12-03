export const filterWatchList = (watchList)=> {
    return [...new Set(watchList)];
}