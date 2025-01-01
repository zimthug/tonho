# Generated by Django 5.1.4 on 2025-01-01 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("school", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="term",
            options={
                "ordering": ["is_active", "year", "name"],
                "verbose_name": "Term",
                "verbose_name_plural": "Terms",
            },
        ),
        migrations.AddField(
            model_name="term",
            name="enrollment_end_date",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="term",
            name="enrollment_start_date",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="term",
            name="is_active",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="term",
            name="is_enrollment_active",
            field=models.BooleanField(default=False),
        ),
    ]