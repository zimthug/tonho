import uuid
from django.db import models


class BaseModel(models.Model):
    """Abstract base model with common fields for model tables."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, editable=False)
    created_by = models.UUIDField(null=True, blank=True, editable=False)
    updated_by = models.UUIDField(null=True, blank=True, editable=False)

    class Meta:
        abstract = True


class UuidBaseModelMixin(BaseModel):
    """Abstract base model with common fields and UUID for PK model tables."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class SequenceBaseModelMixin(BaseModel):
    """Abstract base model with common fields and Sequential ID for PK model tables."""
    id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        abstract = True


class AddressMixin(models.Model):
    """Common address fields."""
    address = models.CharField(max_length=255, blank=True, null=True)
    street = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        abstract = True


class SchoolType(models.TextChoices):
    preschool = 'Preschool'
    primary = 'Primary'
    secondary = 'Secondary'
    college = 'College'
    university = 'University'
    vocational = 'Vocational'
    technical = 'Technical'
    junior = 'Junior'


class School(AddressMixin):
    code = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='images/settings/', blank=True, null=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField()
    type = models.CharField(max_length=255, choices=SchoolType.choices, default=SchoolType.primary)
    website = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}, {self.type} - {self.code}"

    class Meta:
        verbose_name = 'School'
        verbose_name_plural = 'Schools'
        ordering = ['name', 'type']
        db_table = 'school'
