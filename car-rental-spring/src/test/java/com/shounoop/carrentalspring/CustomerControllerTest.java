package com.shounoop.carrentalspring.controller;

import com.shounoop.carrentalspring.dto.BookACarDto;
import com.shounoop.carrentalspring.dto.CarDto;
import com.shounoop.carrentalspring.services.customer.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class CustomerControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private CustomerController customerController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(customerController).build();
    }

    @Test
    void testGetAllCars() throws Exception {
        List<CarDto> cars = Arrays.asList(new CarDto(), new CarDto());
        when(customerService.getAllCars()).thenReturn(cars);

        mockMvc.perform(get("/api/customer/cars"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetCarByIdFound() throws Exception {
        CarDto car = new CarDto();
        when(customerService.getCarById(1L)).thenReturn(car);

        mockMvc.perform(get("/api/customer/car/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetCarByIdNotFound() throws Exception {
        when(customerService.getCarById(999L)).thenReturn(null);

        mockMvc.perform(get("/api/customer/car/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testBookACarSuccessful() throws Exception {
        BookACarDto dto = new BookACarDto();
        when(customerService.bookACar(dto)).thenReturn(true);

        mockMvc.perform(post("/api/customer/car/book")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isCreated());
    }

    @Test
    void testBookACarBadRequest() throws Exception {
        BookACarDto dto = new BookACarDto();
        when(customerService.bookACar(dto)).thenReturn(false);

        mockMvc.perform(post("/api/customer/car/book")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetBookingsByUserId() throws Exception {
        List<BookACarDto> bookings = Arrays.asList(new BookACarDto());
        when(customerService.getBookingsByUserId(1L)).thenReturn(bookings);

        mockMvc.perform(get("/api/customer/car/bookings/1"))
                .andExpect(status().isOk());
    }
}
