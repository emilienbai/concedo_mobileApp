export interface Achievement {
    /**
     * Achievement title
     */
    title: string;
    /**
     * Achievement description
     */
    description: string;
    /**
     * Array of signifier sources
     */
    signifierArray: Array<string>;
    /**
     * Signifier to display
     */
    currentsignifier: string;
    /**
     * Array of levels for achievement
     */
    multiplierLvl: Array<number>;

    /**
     * Check at what level the achievement is filled and if it's some new event
     */
    levelFromRequirement(callback: ((lvl: number, newAchievement:boolean) => void));
}
