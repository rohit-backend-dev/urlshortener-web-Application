//


package com.rohitmishra.urlshortener.dtos;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ClickEventDTO {
    private LocalDate clickDate;
    private Long count;

    public ClickEventDTO(LocalDate clickDate, Long count) {
        this.clickDate = clickDate;
        this.count = count;
    }
}
