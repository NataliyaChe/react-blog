import { THIRTY_MIN_IN_MILLISECONDS } from '../constants';

export function getBanEndDate() {
    const currentDate = new Date();
    const finishBanDate = new Date(currentDate.getTime() + THIRTY_MIN_IN_MILLISECONDS);
    return finishBanDate.getTime()
}

export function getBanTimeLeft(banEndDate) {
    const currentDate = new Date();
    const banTimeLeft = Math.ceil((banEndDate - currentDate) / (THIRTY_MIN_IN_MILLISECONDS))
    return banTimeLeft > 0 ? banTimeLeft : null
}
