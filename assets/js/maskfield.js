document.addEventListener('DOMContentLoaded', () => {
    // Find every concerned maskfields
    const maskfields = document.querySelectorAll('.maskfield')

    // Handle every fields once and listen for change event to handle them
    maskfields.forEach(maskfield => {
        maskfield.addEventListener('change', () => handleField(maskfield))

        handleField(maskfield);
    })
})

const getValue = (maskfield) => {
    const items = maskfield.querySelector('.items')

    // If expanded option is used
    if (!items) {
        const radios = maskfield.querySelectorAll('.form-check input')

        return [...radios].find(radio => radio.checked === true).value;
    }

    const item = maskfield.querySelector('.item')

    if (!item) {
        return "";
    }

    return item.getAttribute('data-value');
}

const getMap = (maskfield) => {
    const uniqID = maskfield.classList[2].substring(10);
    const mapElement = document.querySelector('.maskfield-map-' + uniqID)

    const map = [];

    for (const item of mapElement.children) {
        // Extract data and push it into map array
        map.push({
            key: item.getAttribute('data-key'),
            values: JSON.parse(item.getAttribute('data-values')),
        })
    }

    return map;
}

const getUniqueFieldsName = (maskfield) => {
    const fieldsName = [];
    const map = getMap(maskfield);

    // Push every map values into fieldsName array
    map.forEach(mapObject => fieldsName.push(...mapObject.values))

    // Remove duplicates
    return [...new Set(fieldsName)];
}

const getMapFields = (maskfield) => {
    const parentForm = maskfield.querySelector('input').form;

    const uniqueFieldsName = getUniqueFieldsName(maskfield)

    // Map them into their corresponding dom field
    return uniqueFieldsName.map(field => document.getElementById(parentForm.name + '_' + field).closest('.form-group').parentElement);
}


const handleField = (maskfield) => {
    const value = getValue(maskfield);

    handleMapFields(maskfield, value)
}

const handleMapFields = (maskfield, value) => {
    const parentForm = maskfield.querySelector('input').form;
    const map = getMap(maskfield)
    const fields = getMapFields(maskfield)
    // TODO Compare map and fields
    // TODO find fields "parent" container, when hiding, also "remove" 'flex-fill' elements above?(or after)

    const selectedMapObject = map.find(mapObject => mapObject.key === value)

    const visibleFields = selectedMapObject ? selectedMapObject.values : []

    fields.forEach(field => {
        const fieldInput = field.querySelector('input')
        const fieldNameID = fieldInput.id.substring(parentForm.name.length + 1)

        if (!visibleFields.includes(fieldNameID)) {
            field.style.display = "none";
            return;
        }

        field.style.display = "unset";
    })
}

// What if multiple maskfield "holds" same input ?
// Check sonata maskfield behaviour (checked, it's display: none;)