import xml.etree.ElementTree as ET
import re

# @author Jorge Roberto, Giovane Neves
def extrair_atividades_ordenadas(caminho_svg):
    tree = ET.parse(caminho_svg)
    root = tree.getroot()

    atividades = []

    # Define namespace padrão SVG
    ns = {'svg': 'http://www.w3.org/2000/svg'}

    # Itera sobre todos os elementos <g> com classe "djs-shape"
    for g in root.findall('.//svg:g[@class]', ns):
        if 'djs-shape' not in g.attrib['class']:
            continue

        atividade_id = g.attrib.get('id', '')
        texto_completo = ""

        # Encontra elementos <text> dentro do grupo
        for text_elem in g.findall('.//svg:text', ns):
            tspans = text_elem.findall('svg:tspan', ns)
            texto_completo = ' '.join(
                tspan.text.strip() for tspan in tspans if tspan.text
            )

        # Verifica se começa com um número seguido de ponto, ex: "1.MONITORAR"
        match = re.match(r'^(\d+)\.(.+)', texto_completo)
        if match:
            ordem = int(match.group(1))
            texto = match.group(2).strip()

            atividades.append({
                'id': atividade_id,
                'ordem': ordem,
                'texto': texto
            })

    return atividades


# Exemplo de uso
svg_path = caminho_svg 
atividades = extrair_atividades_ordenadas(svg_path)

for atividade in atividades:
    print(f"ID: {atividade['id']}")
    print(f"ORDEM: {atividade['ordem']}")
    print(f"TEXTO: {atividade['texto']}")
    print("-" * 50)

