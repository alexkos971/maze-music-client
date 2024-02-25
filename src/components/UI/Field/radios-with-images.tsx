import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./Field.module.scss";

interface ItemProps {
    value: string, 
    image: string | StaticImageData | undefined | null, 
    title?: string,
    checked?: boolean,
}

interface ComponentProps {
    name: string, 
    items: ItemProps[],
    columns?: number,
    onChange?: (id: string, index: number) => void
}

// id, image, title, isChecked,
export const RadiosWithImages = ({ name, items, onChange, columns = 2 } : ComponentProps) => {
    let [ checked, setChecked ] = useState<string | undefined>(items.find(el => el.checked == true)?.value);

    useEffect(() => {

    }, [])

    return (
        <div className={[styles.group, styles.group_radios_with_images].join(' ')}>
            {
                items.map((item : ItemProps, index: number) => (
                    <div className={`${styles.field} ${styles.field_radio_image}`} style={{ '--col-width': (100 / Number(columns)) + '%' } as React.CSSProperties} key={item.value}>

                        <label  
                            className={styles.field__label}>  

                            <input 
                                type="radio" 
                                name={name} 
                                checked={checked == item.value}
                                value={item.value} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setChecked(item.value);

                                    if (onChange) {
                                        onChange(item.value, index);
                                    }
                                }} />

                            {
                                item.image ?
                                    <div className={styles.field__image}>
                                        <Image src={item.image} width={0} height={0} alt="Image" />
                                    </div>
                                : ''
                            }

                            {item.title ? 
                                <h5 className={styles.field__title}>{item.title}</h5> 
                            : ''}
                        </label>
                    </div>
                ))
            }    
        
        </div>

    )
}