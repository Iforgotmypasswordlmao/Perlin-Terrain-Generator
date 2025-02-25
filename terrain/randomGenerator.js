export class RandomGenerator
{
    constructor(seed)
    {
        this.prev = seed;
        this.a = 22695477;
        this.c = 1;
        this.m = 2**31;
    };

    rand()
    {
        const randNum = (this.a*this.prev + this.c) % this.m;
        this.prev = randNum;
        return randNum/(this.m-1);
    };
};