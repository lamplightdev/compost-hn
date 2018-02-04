class DateUtils {
  static toRelative(time, reference = Date.now()) {
    const differenceMinutes = Math.floor((reference - time) / (1000 * 60));

    if (differenceMinutes < 1) {
      return 'less than a minute ago';
    }

    if (differenceMinutes < 60) {
      const plural = differenceMinutes === 1 ? '' : 's';
      return `${differenceMinutes} minute${plural} ago`;
    }

    const differenceHours = Math.floor(differenceMinutes / 60);

    if (differenceHours < 24) {
      const plural = differenceHours === 1 ? '' : 's';
      return `${differenceHours} hour${plural} ago`;
    }

    const differenceDays = Math.floor(differenceHours / 24);

    const plural = differenceDays === 1 ? '' : 's';
    return `${differenceDays} day${plural} ago`;
  }
}

export default DateUtils;
