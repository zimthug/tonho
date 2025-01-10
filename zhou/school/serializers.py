from rest_framework import serializers

from .models import Term
from core.serializers import BaseModelSerializerMixin


class TermSerializer(BaseModelSerializerMixin):

    class Meta(BaseModelSerializerMixin.Meta):
        model = Term
        # fields = '__all__'

        def validate_year(self, value):
            if len(str(value)) != 4:
                raise serializers.ValidationError("The year must be exactly 4 characters long.")
            if not (1960 <= value <= 2200):
                raise serializers.ValidationError("The year must be between 1960 and 2200.")
            return value
