export const getRoomID = (userdId1, userId2) => {
    const sortedId = [userdId1, userId2].sort();

    const roomId = sortedId.join('-')

    return roomId

}