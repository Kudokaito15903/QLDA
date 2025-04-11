package com.example.server.mapper;

import java.util.List;

public interface EntityMapper<E, D> {
    D toDto(E entity);
    E toEntity(D dto);
    List<E> toEntities(List<D> dtos);
    List<D> toDtos(List<E> entities);
} 