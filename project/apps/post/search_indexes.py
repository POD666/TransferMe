from haystack import indexes
# from apps.core.models import TestTable

#TODO: Write search indexes to Request and Offer models

# class ContentIndex(indexes.SearchIndex, indexes.Indexable):
#     text = indexes.CharField(document=True)  # default language
#     test_field = indexes.CharField(model_attr='test_field')  # English
#     test_field_en = indexes.CharField(model_attr='test_field_en')  # English
#     test_field_de = indexes.CharField(model_attr='test_field_de')  # German
#
#     def prepare_test_field(self, obj):
#         return obj.test_field
#
#     def prepare_text_en(self, obj):
#         return obj.test_field_en
#
#     def prepare_text_de(self, obj):
#         return obj.test_field_de
#
#     def get_model(self):
#         return TestTable
