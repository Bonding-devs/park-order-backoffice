
declare global {
    interface Date {
        toLocaleTimeStringWithoutSeconds(): string;
        toLocaleDateStringWithoutSeconds(): string;
    }
}
Date.prototype.toLocaleTimeStringWithoutSeconds = function (): string {
    return this.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: undefined,
    });
};
Date.prototype.toLocaleDateStringWithoutSeconds = function (): string {
    return this.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: undefined,
    });
  };

export const dateHelpers = () => {
    const getTime = (date: Date): string => {
        const now = new Date();
        const dateN = new Date(date);
        const diff = now.getTime() - dateN.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 1) {
            return dateN.toLocaleDateStringWithoutSeconds();
        }
        if (days === 1) {
            return 'Yesterday at ' + dateN.toLocaleTimeStringWithoutSeconds();
        }
        if (hours > 1) {
            return hours + ' hours ago';
        }
        return minutes + ' minutes ago';
    };
    return {
        getTime
    }
}