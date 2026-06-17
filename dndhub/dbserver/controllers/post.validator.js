export class PostsValidators {

    static assertIdxCampagna(idx_campagna, reporter) {
        const ok =
            idx_campagna !== undefined &&
            idx_campagna !== null &&
            typeof idx_campagna === "string" //metti che per sbaglio qualcuno scrive dei numeri e il ts lo interpreta come numero rompe trim()
            idx_campagna.trim().length > 0;

        if (!ok) reporter();

        return ok;
    }


    static assertContenuto(contenuto, reporter) {
        const ok =
            contenuto !== undefined &&
            contenuto !== null &&
            typeof contenuto === "string"
            contenuto.trim().length > 0;

        if (!ok) reporter();

        return ok;
    }

    static assertTimestamp(time_stamp, reporter) {
        const ok =
            time_stamp !== undefined &&
            time_stamp !== null &&
            !isNaN(Date.parse(time_stamp));

            if(!ok) reporter();
            
            return ok;

    }
}