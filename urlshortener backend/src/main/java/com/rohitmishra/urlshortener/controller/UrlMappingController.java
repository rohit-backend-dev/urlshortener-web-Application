

package com.rohitmishra.urlshortener.controller;

import com.rohitmishra.urlshortener.dtos.ClickEventDTO;
import com.rohitmishra.urlshortener.dtos.UrlMappingDTO;
import com.rohitmishra.urlshortener.modals.User;
import com.rohitmishra.urlshortener.service.UrlMappingService;
import com.rohitmishra.urlshortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {

    private UrlMappingService urlMappingService;
    private UserService userService;

    // ------------------ CREATE ------------------
    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDTO> createShortUrl(
            @RequestBody Map<String, String> request,
            Principal principal
    ) {
        User user = userService.findByUsername(principal.getName());
        UrlMappingDTO dto = urlMappingService.createShortUrl(
                request.get("originalUrl"), user);
        return ResponseEntity.ok(dto);
    }

    // ------------------ READ LIST ------------------
    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        return ResponseEntity.ok(urlMappingService.getUrlsByUser(user));
    }

    // ------------------ UPDATE (EDIT URL) ------------------
    @PutMapping("/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateUrl(
            @PathVariable String shortUrl,
            @RequestBody Map<String, String> request,
            Principal principal
    ) {
        User user = userService.findByUsername(principal.getName());
        String newUrl = request.get("originalUrl");

        UrlMappingDTO updated = urlMappingService.updateShortUrl(shortUrl, newUrl, user);
        if (updated == null) {
            return ResponseEntity.status(403).body("Not allowed or URL not found.");
        }

        return ResponseEntity.ok(updated);
    }

    // ------------------ DELETE ------------------
    @DeleteMapping("/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteUrl(@PathVariable String shortUrl, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        boolean deleted = urlMappingService.deleteShortUrl(shortUrl, user);

        if (!deleted) {
            return ResponseEntity.status(403).body("Not allowed or URL not found.");
        }

        return ResponseEntity.ok("URL deleted successfully.");
    }

    // ------------------ ANALYTICS ------------------
    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDTO>> getAnalytics(
            @PathVariable String shortUrl,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {

        LocalDateTime start = LocalDateTime.parse(startDate, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        LocalDateTime end = LocalDateTime.parse(endDate, DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        return ResponseEntity.ok(urlMappingService.getClickEventsByDate(shortUrl, start, end));
    }

    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getTotalClicks(
            Principal principal,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {

        User user = userService.findByUsername(principal.getName());
        LocalDate start = LocalDate.parse(startDate, DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate end = LocalDate.parse(endDate, DateTimeFormatter.ISO_LOCAL_DATE);

        return ResponseEntity.ok(urlMappingService.getTotalClicksByUserAndDate(user, start, end));
    }
}
