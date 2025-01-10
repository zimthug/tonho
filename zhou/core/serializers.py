from rest_framework import serializers
# from drf_spectacular.utils import OpenApiResponse


class BaseModelSerializerMixin(serializers.ModelSerializer):

    class Meta:
        exclude = ['created_at', 'updated_at', 'created_by', 'updated_by']


class BaseResponseSerializer(serializers.Serializer):
    status = serializers.CharField()
    data = serializers.JSONField()


def generate_response_serializer(data_serializer):

    class CustomResponseSerializer(BaseResponseSerializer):
        data = data_serializer(many=True)
    return CustomResponseSerializer
