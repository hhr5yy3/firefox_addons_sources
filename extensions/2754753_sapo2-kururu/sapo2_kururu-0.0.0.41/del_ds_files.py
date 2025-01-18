#!/usr/bin/env python3

import os
import sys


def __lista_arquivos(dir):
    def arquivos(dir):
        arqs = os.listdir(dir)
        for a in arqs:
            caminho = os.path.join(dir, a)
            if os.path.isfile(caminho):
                lista.append(caminho)
            elif os.path.isdir(caminho) and not a.startswith('.'):
                arquivos(caminho)
    # ------------------------------
    lista = []
    arquivos(dir)
    return lista


def apagar(diretorio):
    arquivos = __lista_arquivos(diretorio)
    to_del = []
    for a in arquivos:
        if a.endswith('.DS_Store'):
            to_del.append(a)
    print ('\r{} arquivos encontrados'.format(len(to_del)))
    for a in to_del:
        if os.path.isdir(a):
            os.removedirs(a)
        else:
            os.remove(a)
        print (a)
    print ('\r{} arquivos removidos'.format(len(to_del)))


if __name__ == '__main__':
    diretorio = sys.argv[1] if len(sys.argv) > 1 else '.'
    print ('Serao apagados todos os arquivos .DS_Store no diretorio indicado e nos seus subdiretorios.')
    resp = input('Deseja continuar? (Y/N) ')
    if resp in ('y', 'Y'):
        print ('Aguarde...', end='')
        apagar(diretorio)
    else:
        print ('Procedimento cancelado.')