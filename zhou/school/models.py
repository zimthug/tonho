from django.db import models

from core.models import SequenceBaseModelMixin


class Clazz(SequenceBaseModelMixin):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=120, blank=True, null=True)

    class Meta:
        verbose_name = 'Class'
        verbose_name_plural = 'Classes'
        db_table = 'clazz'

    def __str__(self):
        return self.name


class Term(SequenceBaseModelMixin):
    year = models.IntegerField()
    name = models.CharField(max_length=30)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    enrollment_start_date = models.DateField(blank=True, null=True)
    enrollment_end_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=False)
    is_enrollment_active = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Term'
        verbose_name_plural = 'Terms'
        db_table = 'term'
        unique_together = ('year', 'name')
        ordering = ['is_active', 'year', 'name']

    def __str__(self):
        return f"{self.year} {self.name}"


class TermClazz(SequenceBaseModelMixin):
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    clazz = models.ForeignKey(Clazz, on_delete=models.CASCADE)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    class Meta:
        verbose_name = 'Term Class'
        verbose_name_plural = 'Term Classes'
        db_table = 'term_clazz'
        unique_together = ('term', 'clazz')

    def __str__(self):
        return f"{self.term} / {self.clazz}"


# class Subject(models.Model):
#     pass


# class TermClazzSubject(models.Model):
#     pass


# class Fee(models.Model):
#     pass


# class TermClazzFee(models.Model):
#     pass
