export const pickByLimit = (data, limit) => {
    const stepSize = Math.max(1, Math.floor(data.length / limit))
    const selectedData = []

    for (let i = 0; i < data.length; i += stepSize) {
        selectedData.push(data[i])
    }

    return selectedData
}
