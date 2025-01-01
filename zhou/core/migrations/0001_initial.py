# Generated by Django 5.1.4 on 2025-01-01 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="School",
            fields=[
                (
                    "code",
                    models.CharField(max_length=10, primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=255)),
                ("address", models.CharField(blank=True, max_length=255, null=True)),
                ("street", models.CharField(blank=True, max_length=255, null=True)),
                ("city", models.CharField(max_length=255)),
                ("state", models.CharField(max_length=255)),
                ("zip_code", models.CharField(blank=True, max_length=255, null=True)),
                (
                    "logo",
                    models.ImageField(
                        blank=True, null=True, upload_to="images/settings/"
                    ),
                ),
                ("phone", models.CharField(blank=True, max_length=255, null=True)),
                ("email", models.EmailField(max_length=254)),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("Preschool", "Preschool"),
                            ("Primary", "Primary"),
                            ("Secondary", "Secondary"),
                            ("College", "College"),
                            ("University", "University"),
                            ("Vocational", "Vocational"),
                            ("Technical", "Technical"),
                            ("Junior", "Junior"),
                        ],
                        default="Primary",
                        max_length=255,
                    ),
                ),
                ("website", models.URLField(blank=True, null=True)),
            ],
            options={
                "verbose_name": "School",
                "verbose_name_plural": "Schools",
                "db_table": "school",
                "ordering": ["name", "type"],
            },
        ),
    ]
