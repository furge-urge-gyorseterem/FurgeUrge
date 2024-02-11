
class TablazatView {
    #adat = {};
    #toroltSorok = [];
    #szerkesztesMode = false;
    constructor(adat, szuloElem) {
        this.#adat = adat;
        this.tablaElem = szuloElem;
        if (this.tablaElem.children("tr").length === 0) {
            this.#generateHeaderRow();
        }
        this.#sor();
        this.sorElem = this.tablaElem.children("tr:last-child");

    }




    #generateHeaderRow() {
        let headerRow = "<tr>";
        const excludedKeys = ['created_at', 'updated_at','email_verified_at']; 
        Object.keys(this.#adat).forEach(key => {
            if (!excludedKeys.includes(key)) {
            headerRow += `<th>${key}</th>`;
            }
        });
        headerRow += "</tr>";
        this.tablaElem.append(headerRow);
    }
    #sor() {
        
        let txt = "<tr>";

        const excludedKeys = ['created_at', 'updated_at','email_verified_at']; 
        
        Object.entries(this.#adat).forEach(([key, value]) => {
            if (!excludedKeys.includes(key)) {
                const stringValue = String(value);
            const modifiedValue = stringValue.replace(/\//g, '<br>');
            txt += `<td class="adat">${modifiedValue}</td>`;
            }
        });
    
    
        txt += "</tr>";
        this.tablaElem.append(txt);
    }

}

export default TablazatView;