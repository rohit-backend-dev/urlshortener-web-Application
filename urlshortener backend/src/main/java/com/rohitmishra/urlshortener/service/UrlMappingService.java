package com.rohitmishra.urlshortener.service;

import com.rohitmishra.urlshortener.dtos.ClickEventDTO;
import com.rohitmishra.urlshortener.dtos.UrlMappingDTO;
import com.rohitmishra.urlshortener.modals.ClickEvent;
import com.rohitmishra.urlshortener.modals.UrlMapping;
import com.rohitmishra.urlshortener.modals.User;
import com.rohitmishra.urlshortener.repository.ClickEventRepository;
import com.rohitmishra.urlshortener.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UrlMappingService {

    private UrlMappingRepository urlMappingRepository;
    private ClickEventRepository clickEventRepository;

    // ------------------ CREATE ------------------
    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl();
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        UrlMapping saved = urlMappingRepository.save(urlMapping);
        return convertToDto(saved);
    }

    // ------------------ UPDATE (EDIT URL) ------------------
    public UrlMappingDTO updateShortUrl(String shortUrl, String newOriginalUrl, User user) {
        UrlMapping url = urlMappingRepository.findByShortUrl(shortUrl);

        if (url == null || !url.getUser().getId().equals(user.getId())) {
            return null; // unauthorized or not found
        }

        url.setOriginalUrl(newOriginalUrl);
        UrlMapping updated = urlMappingRepository.save(url);

        return convertToDto(updated);
    }

    // ------------------ DELETE (Simplified) ------------------
    public boolean deleteShortUrl(String shortUrl, User user) {
        UrlMapping url = urlMappingRepository.findByShortUrl(shortUrl);

        if (url == null || !url.getUser().getId().equals(user.getId())) {
            return false;
        }

        urlMappingRepository.delete(url);
        return true;
    }

    private UrlMappingDTO convertToDto(UrlMapping urlMapping){
        UrlMappingDTO dto = new UrlMappingDTO();
        dto.setId(urlMapping.getId());
        dto.setOriginalUrl(urlMapping.getOriginalUrl());
        dto.setShortUrl(urlMapping.getShortUrl());
        dto.setClickCount(urlMapping.getClickCount());
        dto.setCreatedDate(urlMapping.getCreatedDate());
        dto.setUsername(urlMapping.getUser().getUsername());
        return dto;
    }

    private String generateShortUrl() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(8);

        for (int i = 0; i < 8; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    public List<UrlMappingDTO> getUrlsByUser(User user) {
        return urlMappingRepository.findByUser(user)
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        UrlMapping mapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (mapping != null) {
            return clickEventRepository
                    .findByUrlMappingAndClickDateBetween(mapping, start, end)
                    .stream()
                    .collect(Collectors.groupingBy(
                            c -> c.getClickDate().toLocalDate(),
                            Collectors.counting()
                    ))
                    .entrySet()
                    .stream()
                    .map(e -> new ClickEventDTO(e.getKey(), e.getValue()))
                    .toList();
        }
        return null;
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
        List<UrlMapping> userUrls = urlMappingRepository.findByUser(user);
        List<ClickEvent> events = clickEventRepository
                .findByUrlMappingInAndClickDateBetween(userUrls,
                        start.atStartOfDay(),
                        end.plusDays(1).atStartOfDay());

        return events.stream()
                .collect(Collectors.groupingBy(
                        c -> c.getClickDate().toLocalDate(),
                        Collectors.counting()
                ));
    }

    public UrlMapping getOriginalUrl(String shortUrl) {
        UrlMapping mapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (mapping != null) {
            mapping.setClickCount(mapping.getClickCount() + 1);
            urlMappingRepository.save(mapping);

            ClickEvent event = new ClickEvent();
            event.setClickDate(LocalDateTime.now());
            event.setUrlMapping(mapping);
            clickEventRepository.save(event);
        }
        return mapping;
    }
}
