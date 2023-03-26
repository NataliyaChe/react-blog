import { THIRTY_MIN_IN_MILLISECONDS } from '../constants';

const currentDate = new Date();

export function getBanEndDate() {
    const finishBanDate = new Date(currentDate.getTime() + THIRTY_MIN_IN_MILLISECONDS);
    return finishBanDate.getTime()
}

export function getBanTimeLeft(banEndDate) {
    const banTimeLeft = Math.ceil((banEndDate - currentDate.getTime()) / (THIRTY_MIN_IN_MILLISECONDS))
    return banTimeLeft
}
