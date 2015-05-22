from haystack import indexes
from .models import Place


class PlaceIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True)
    title = indexes.EdgeNgramField(model_attr='title')

    def get_model(self):
        return Place
